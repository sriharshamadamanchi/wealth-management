// Copyright © 2025 Sustains AI, All Rights Reserved
import { CSSSelector } from "../shared";

export interface FadeEffectMethods {}

export interface FadeEffectEvents {}

export interface FadeEffectOptions {

  /**
   * Enables slides cross fade
   *
   * @default false
   */
  crossFade?: boolean;

  /**
   * CSS selector of the element inside of the slide to transform instead of the slide itself. Useful to use with cssMode
   *
   * @default null
   */
  transformEl?: CSSSelector;
}
