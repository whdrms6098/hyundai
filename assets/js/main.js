gsap.registerPlugin(TextPlugin);

function generateRandomText(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const mm = gsap.matchMedia();

$(document).ready(function () {
  gsap.set(`[data-move="y-move"]`, { yPercent: 100 });
  gsap.set(`[data-effect="fade"]`, { opacity: 0 });

  let hasRun = false;

  function Refresh() {
    if (window.matchMedia("(min-width: 1001px)").matches) {
      $(window).on("beforeunload", function () {
        $(window).scrollTop(0);
      });
    } else {
      $(window).off("beforeunload");
    }
  }

  function LoadingCard() {
    if (!hasRun && window.matchMedia("(min-width: 1001px)").matches) {
      const loading = gsap.timeline();

      loading.to(
        `.card-event .loading-card .card`,
        {
          scale: 1,
          stagger: 0.1,
          onStart: function () {
            $("html").css("overflow", "hidden");
          },
        },
        "start"
      );

      loading.to(
        ".sc-intro .img-area .img1 path",
        { opacity: 1, y: 0, stagger: 0.1 },
        "start"
      );

      loading.to(
        ".sc-intro .img-area .img2 path",
        { opacity: 1, y: 0, stagger: 0.1 },
        "start"
      );

      loading.to(
        ".sc-intro .img-area .img3 path",
        { opacity: 1, y: 0, stagger: -0.1 },
        "start"
      );

      loading.to(
        `.card-event .loading-card .card-item:not(:last-child) .card`,
        {
          scale: 0,
          stagger: 0.1,
        }
      );

      loading.to(
        ".card-event .card-item.card8",
        {
          top: "55%",
          duration: 1,
          onStart: function () {
            $(".card-event .card-item.card8").addClass("active");
          },
        },
        "end"
      );

      loading.to(
        `.card-event [class*="list"] .card`,
        {
          rotate: 0,
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1,
        },
        "end"
      );

      loading.to(
        ".sc-intro .img-area svg:not(.img2)",
        {
          width: 0,
          onStart: function () {
            $(".sc-intro .group-logo .img-area").addClass("active");
          },
        },
        "end"
      );

      loading.to(".sc-intro .group-title", { opacity: 1, y: 0 }, "text");
      loading.to(
        ".sc-intro .group-logo .desc-area",
        {
          opacity: 1,
          y: 0,
          onComplete: function () {
            $(".sc-intro .group-card").addClass("active");
            $("html").css("overflow", "inherit");
          },
        },
        "text"
      );

      hasRun = true;
    } else {
      if (!$("body").hasClass("active")) {
        $("body").addClass("active");
        $("html").css("overflow", "inherit");
      }
      gsap.set(`[data-effect="fade"]`, { opacity: 1 });
    }
  }

  LoadingCard();

  Refresh();

  $(window).resize(Refresh);
});

mm.add("(min-width: 1001px)", () => {
  const cardBox = $(".sc-info .desc-area");

  const intro = gsap
    .timeline({
      scrollTrigger: {
        trigger: ".sc-intro",
        start: "0% 0%",
        end: "100% 100%",
        endTrigger: ".sc-info .desc-area",
        scrub: 0,
        // markers: true,
        invalidateOnRefresh: true,
      },
    })
    .to(".sc-intro .group-title", { yPercent: -200 }, "first")
    .to(".card-event .list1", { yPercent: -140 }, "first")
    .to(".card-event .list4", { yPercent: -140 }, "first")
    .to(".card-event .list2", { yPercent: -120 }, "first+=0.1")
    .to(".card-event .list3", { yPercent: -120 }, "first+=0.1")
    .to(
      ".card-event .card-item.card8",
      {
        ease: "none",
        yPercent: 0,
        top: 0,
        marginTop: 47.5,
        y: function () {
          return cardBox.offset().top;
        },
        onEnter: function () {
          $(
            ".card-event .card-item.card8 .front, .card-event .card-item.card8 .back"
          ).css("transition", "none");
        },
      },
      "first"
    )
    .to(
      ".card-event .card-item.card8",
      {
        x: function () {
          return -cardBox.outerWidth() / 4;
        },
        width: "257px",
        height: "405px",
        rotateY: -180,
        duration: 0.3,
      },
      "first+=0.05"
    )
    .to(
      ".card-event .card-item.card8 .front",
      { rotateY: -180, duration: 0.3 },
      "first+=0.05"
    )
    .to(
      ".card-event .card-item.card8 .back",
      {
        rotateY: 0,
        scaleX: -1,
        duration: 0.3,
      },
      "first+=0.05"
    );

  ScrollTrigger.create({
    trigger: ".sc-info .sticky-wrap",
    start: "3% 0%",
    end: "100% 100%",
    // scrub: 0,
    // markers: true,
    onEnter: function () {
      $(".card-event .card-wrap .card-item.card8").css("display", "none");
      $(".sc-info .card-box .card-item").css("display", "block");
    },
    onLeaveBack: function () {
      $(".card-event .card-wrap .card-item.card8").css("display", "block");
      $(".sc-info .card-box .card-item").css("display", "none");
    },
  });
});

mm.add("(max-width:1000px)", () => {
  gsap.set(`[data-effect="fade"]`, { opacity: 1 });
});

mm.add("(min-width:781px)", () => {
  const cardRotate = gsap.to(".sc-fonts .group-end .card-wrap", {
    scrollTrigger: {
      trigger: ".sc-fonts .spin-area",
      start: "0% 100%",
      end: "250% 0%",
      scrub: 0,
      // markers: true,
    },
    rotate: 80,
    duration: 200,
  });
});

mm.add("(max-width:780px)", () => {
  const cardRotate = gsap.to(".sc-fonts .group-end .card-wrap", {
    scrollTrigger: {
      trigger: ".sc-fonts .spin-area",
      start: "0% 90%",
      end: "250% 0%",
      scrub: 0,
      // markers: true,
    },
    rotate: 40,
    duration: 200,
  });
});

const fontInfo = gsap
  .timeline({
    scrollTrigger: {
      trigger: ".sc-font-info",
      start: "0% 90%",
      end: "100% 100%",
      // markers: true,
    },
  })
  .to(`.sc-font-info [data-move="y-move"]`, { yPercent: 0, stagger: 0.1 });

$(".font-info-svg path").each(function () {
  const path = $(this)[0];

  const length = path.getTotalLength();

  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;

  const svgLine = gsap
    .timeline({
      scrollTrigger: {
        trigger: ".sc-font-info",
        start: "0% 60%",
        end: "100% 100%",
        // markers: true,
      },
    })
    .fromTo(
      path,
      { strokeDashoffset: length },
      { strokeDashoffset: 0, duration: 6 },
      "line"
    )
    .fromTo(
      $(".font-info-svg").find("g"),
      { opacity: 0 },
      { opacity: 1, delay: 1 },
      "line"
    );
});

$(".number-bg span").each(function () {
  const originalText = $(this).text();
  const originalLength = originalText.length;
  const el = $(this);

  const randomText = generateRandomText(originalLength);
  gsap
    .timeline({
      scrollTrigger: {
        trigger: el,
        start: "0% 50%",
        end: "100% 100%",
        endTrigger: $(this).parents(".number-bg"),
        // markers: true,
      },
    })
    .to(el, {
      duration: 0.2,
      text: randomText,
      onComplete: function () {
        gsap.to(el, {
          duration: 0.2,
          text: originalText,
        });
      },
    });
});

const fontsText1 = gsap
  .timeline({
    scrollTrigger: {
      trigger: ".sc-fonts .group-header",
      start: "0% 70%",
      end: "100% 100%",
      // markers: true,
    },
  })
  .to(`.sc-fonts .group-header .title-area [data-move="y-move"]`, {
    yPercent: 0,
    stagger: 0.1,
  });

const fontsCard = gsap.timeline({
  scrollTrigger: {
    trigger: ".sc-fonts .group-header",
    start: "0% 30%",
    end: "150% 100%",
    endTrigger: ".sc-fonts .group-title",
    scrub: 0,
    // markers: true,
  },
});

$(".sc-fonts .group-header .card-item").each(function () {
  fontsCard.to($(this), { display: "block" });
});


$(".sc-fonts .group-card .font-card").each(function () {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: $(this),
        start: "0% 100%",
        end: "0% 100%",
        toggleActions: "play none reverse none",
        // markers: true,
      },
    })
    .to($(this).find(".font-card-item"), {
      rotateX: 0,
      opacity: 1,
      duration: 1,
    });
});

const endText = gsap
  .timeline({
    scrollTrigger: {
      trigger: ".group-end h3",
      start: "0% 60%",
      end: "100% 100%",
      // scrub: 0,
      // markers: true,
    },
  })
  .to(`.group-end h3 [data-move="y-move"]`, { yPercent: 0, stagger: 0.1 });

const shareText = gsap
  .timeline({
    scrollTrigger: {
      trigger: ".sc-share .group-title",
      start: "0% 40%",
      end: "100% 100%",
      // scrub: 0,
      // markers: true,
    },
  })
  .to(`.sc-share .group-title [data-move="y-move"]`, {
    yPercent: 0,
    stagger: 0.1,
  });
