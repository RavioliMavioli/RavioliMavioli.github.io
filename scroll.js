function scrollToTarget(elementID) {

    var element = document.getElementById(elementID);
    element.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }

  function scrollToTargetAdjusted(elementID, offset) {
        var element = document.getElementById(elementID);
      var headerOffset = offset;
        var elementPosition = element.getBoundingClientRect().top;
      var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
      });   
  }

  function backToTop() {
    window.scrollTo(0, 0);
  }