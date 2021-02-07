handleHashPresentOnPageLoad();
initHashChangeListener();

function findNodeInArrayByAttr(
  nodeArray = [],
  attributeName = "",
  comparisonValue = ""
) {
  return nodeArray.filter(function (element) {
    const elementAttrValue = element.getAttribute(attributeName);
    return elementAttrValue === comparisonValue;
  })[0];
}

function showOnlyThatSectionByHashVal(hashValue = "") {
  const formattedHashVal = hashValue.replace("#", "");
  hideAllSectionsAndChapters();
  const chapterNodes = [...document.querySelectorAll(".akn-chapter")];
  const sectionNodes = [...document.querySelectorAll(".akn-section")];

  const nextActiveChapter = findNodeInArrayByAttr(
    chapterNodes,
    "id",
    formattedHashVal
  );
  if (nextActiveChapter) {
    const childSections = [
      ...nextActiveChapter.querySelectorAll(".akn-section"),
    ];

    childSections.forEach(function (sectionElement) {
      sectionElement.classList.remove("hide");
    });

    return nextActiveChapter.classList.remove("hide");
  }

  const nextActiveSection = findNodeInArrayByAttr(
    sectionNodes,
    "id",
    formattedHashVal
  );

  if (nextActiveSection) {
    const parentChapter = nextActiveSection.parentElement;
    parentChapter.classList.remove("hide");
    return nextActiveSection.classList.remove("hide");
  }
  return false;
}

function handleHashPresentOnPageLoad() {
  const hashValue = window.location.hash;
  if (hashValue) {
    showOnlyThatSectionByHashVal(hashValue);
    handleTOCActivityStateByHashVal(hashValue);
  }
}

function hashHandler() {
  const hashValue = window.location.hash;
  showOnlyThatSectionByHashVal(hashValue);
  handleTOCActivityStateByHashVal(hashValue);
}

function initHashChangeListener() {
  window.addEventListener("hashchange", hashHandler, false);
}

function hideAllSectionsAndChapters() {
  const sectionNodes = [...document.querySelectorAll(".akn-section")];
  const chapterNodes = [...document.querySelectorAll(".akn-chapter")];
  chapterNodes.forEach(function (chapterElement) {
    chapterElement.classList.add("hide");
  });

  sectionNodes.forEach(function (sectionElement) {
    sectionElement.classList.add("hide");
  });
}

function handleTOCActivityStateByHashVal(hashValue = "") {
  clearActiveStateOfTOC();
  const chapterLinks = [...document.querySelectorAll(".toc-chapter > a")];

  const nextActiveChaptLink = findNodeInArrayByAttr(
    chapterLinks,
    "href",
    hashValue
  );
  if (nextActiveChaptLink) {
    /*Highlight chapter text and check radio to show contenxt*/
    nextActiveChaptLink.classList.add("toc-link-active");
    const associatedTogglerInput = nextActiveChaptLink.previousElementSibling;
    return (associatedTogglerInput.checked = true);
  }

  const sectionLinks = [...document.querySelectorAll(".toc-section > a")];
  const nextActiveSectionLink = findNodeInArrayByAttr(
    sectionLinks,
    "href",
    hashValue
  );

  if (nextActiveSectionLink) {
    /*Highlight section link text and in parent check radio to show content*/
    nextActiveSectionLink.classList.add("toc-link-active");
    const chapterContainerElement = nextActiveSectionLink.closest(
      ".toc-chapter"
    );
    const associatedTogglerInput = chapterContainerElement.querySelector(
      "input"
    );
    associatedTogglerInput.checked = true;
    return nextActiveSectionLink.closest("a").classList.add("toc-link-active");
  }

  return false;
}

function clearActiveStateOfTOC() {
  /*
  * Uncheck radio buttons that show associated contenxt and bold classes
  * */
  const chapterLinks = [...document.querySelectorAll(".toc-chapter > a")];
  const sectionLinks = [...document.querySelectorAll(".toc-section > a")];
  const tocRadios = [...document.querySelectorAll(".chp-toggler")];
  tocRadios.forEach(function (radio) {
    radio.checked = false;
  });
  chapterLinks.forEach(function (chapterLink) {
    chapterLink.classList.remove("toc-link-active");
  });

  sectionLinks.forEach(function (sectionLink) {
    sectionLink.classList.remove("toc-link-active");
  });
}
