// Copyright © 2025 Sustains AI, All Rights Reserved
import transitionEmit from "./transitionEmit.js";

export default function transitionStart(runCallbacks = true, direction) {
  const swiper = this;
  const {
    params
  } = swiper;
  if (params.cssMode) {
    return;
  }

  if (params.autoHeight) {
    swiper.updateAutoHeight();
  }

  transitionEmit({
    swiper,
    runCallbacks,
    direction,
    step: "Start"
  });
}
