document.addEventListener("DOMContentLoaded", () => {
  const backgroundLayer = document.querySelector(".page-bg-animation");
  const toastRegion = document.querySelector(".toast-region");
  const cardsSection = document.getElementById("feature-cards");
  const firstCard = cardsSection?.querySelector(".feature-card");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let toastTimer = null;

  /**
   * 显示页面内统一风格的提示，不使用浏览器原生弹窗。
   * @param {string} message
   */
  function showToast(message) {
    if (!toastRegion) {
      return;
    }

    if (toastTimer) {
      window.clearTimeout(toastTimer);
      toastTimer = null;
    }

    toastRegion.innerHTML = "";

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    toastRegion.appendChild(toast);

    window.requestAnimationFrame(() => {
      toast.classList.add("is-visible");
    });

    toastTimer = window.setTimeout(() => {
      toast.classList.remove("is-visible");
      window.setTimeout(() => toast.remove(), 220);
    }, 2000);
  }

  /**
   * 统一处理图片加载失败，标记容器并隐藏破图，不再显示占位图遮挡背景。
   * @param {HTMLImageElement} image
   */
  function applyImageFallback(image) {
    if (!(image instanceof HTMLImageElement)) {
      return;
    }

    const targetSelector = image.dataset.fallbackTarget;
    const fallbackTarget = targetSelector ? image.closest(targetSelector) || document.querySelector(targetSelector) : image.parentElement;

    if (fallbackTarget) {
      fallbackTarget.classList.add("is-image-missing");
    }

    if (!image.dataset.fallbackApplied) {
      image.dataset.fallbackApplied = "true";
      image.style.visibility = "hidden";
    }
  }

  /**
   * 初始化所有图片的兜底行为，确保缺图不出现破图图标。
   */
  function bindImageFallbacks() {
    const images = document.querySelectorAll(".js-fallback-image");

    images.forEach((image) => {
      if (!(image instanceof HTMLImageElement)) {
        return;
      }

      image.addEventListener("error", () => {
        applyImageFallback(image);
      });

      image.addEventListener("load", () => {
        const targetSelector = image.dataset.fallbackTarget;
        const fallbackTarget = targetSelector ? image.closest(targetSelector) || document.querySelector(targetSelector) : image.parentElement;

        if (image.naturalWidth > 0 && fallbackTarget) {
          fallbackTarget.classList.remove("is-image-missing");
        }
      });

      if (image.complete && image.naturalWidth === 0) {
        applyImageFallback(image);
      }
    });
  }

  /**
   * 绑定所有需要弹出提示的按钮。
   */
  function bindToastTriggers() {
    const toastButtons = document.querySelectorAll(".js-toast-trigger");
    const walletButton = document.querySelector(".js-wallet-button");

    toastButtons.forEach((button) => {
      button.addEventListener("click", () => {
        showToast(button.dataset.toast || "功能开发中");
      });
    });

    walletButton?.addEventListener("click", () => {
      showToast("钱包连接功能开发中");
    });
  }

  /**
   * 点击主按钮后滚动到底部卡片，并突出第一张卡片。
   */
  function bindCardScroller() {
    const startButton = document.querySelector(".js-scroll-cards");

    startButton?.addEventListener("click", () => {
      if (!cardsSection) {
        return;
      }

      cardsSection.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "end"
      });

      if (firstCard) {
        firstCard.classList.remove("is-highlighted");
        window.setTimeout(() => {
          firstCard.classList.add("is-highlighted");
        }, prefersReducedMotion ? 0 : 180);
        window.setTimeout(() => {
          firstCard.classList.remove("is-highlighted");
        }, 2000);
      }
    });
  }

  /**
   * 图片预览弹窗控制逻辑
   */
  function bindImagePreview() {
    const previewBtn = document.querySelector(".js-preview-image");
    const modal = document.getElementById("rulePreviewModal");
    const closeBtns = document.querySelectorAll(".js-preview-close");

    if (!previewBtn || !modal) return;

    previewBtn.addEventListener("click", () => {
      modal.hidden = false;
      document.body.style.overflow = "hidden"; // 锁住底层滚动
    });

    closeBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        modal.hidden = true;
        document.body.style.overflow = ""; // 恢复滚动
      });
    });
  }

  /**
   * 使用 image/bg2 下的序列帧驱动网页端背景动画，手机端保持纯渐变背景。
   */
  function initBackgroundAnimation() {
    if (!backgroundLayer) {
      return;
    }

    const isMobileViewport = window.matchMedia("(max-width: 767px)").matches;

    if (isMobileViewport) {
      backgroundLayer.style.backgroundImage = "";
      return;
    }

    const frameCount = 148;
    const frameDuration = 1000 / 12;
    let currentFrame = 0;
    let lastTimestamp = 0;
    let animationId = 0;

    const getFrameUrl = (frameIndex) => encodeURI(`image/bg2/帧 ${frameIndex}.webp`);

    const renderFrame = (frameIndex) => {
      backgroundLayer.style.backgroundImage = `url("${getFrameUrl(frameIndex)}")`;
    };

    const preloadFrame = (frameIndex) => {
      const image = new Image();
      image.src = getFrameUrl(frameIndex % frameCount);
    };

    const tick = (timestamp) => {
      if (document.hidden) {
        animationId = window.requestAnimationFrame(tick);
        return;
      }

      if (!lastTimestamp) {
        lastTimestamp = timestamp;
      }

      if (timestamp - lastTimestamp >= frameDuration) {
        currentFrame = (currentFrame + 1) % frameCount;
        renderFrame(currentFrame);
        preloadFrame(currentFrame + 1);
        lastTimestamp = timestamp;
      }

      animationId = window.requestAnimationFrame(tick);
    };

    renderFrame(0);
    preloadFrame(1);

    if (prefersReducedMotion) {
      return;
    }

    animationId = window.requestAnimationFrame(tick);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        lastTimestamp = 0;
      }
    });

    window.addEventListener("beforeunload", () => {
      if (animationId) {
        window.cancelAnimationFrame(animationId);
      }
    });
  }

  initBackgroundAnimation();
  bindImageFallbacks();
  bindToastTriggers();
  bindCardScroller();
  bindImagePreview();
});
