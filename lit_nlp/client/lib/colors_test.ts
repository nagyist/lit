/**
 * @fileoverview Tests for validating the behavior of the colors library
 *
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import 'jasmine';
import {range} from './utils';

import {
  ColorValue, MinorColorValue,
  BRAND_COLORS, getBrandColor, LitBrandPaletteKey,
  MAJOR_TONAL_COLORS, getMajorTonalColor, LitMajorTonalPaletteKey,
  MINOR_TONAL_COLORS, getMinorTonalColor, LitTonalPaletteKey,
  ERROR_COLORS, getErrorColor,
  VIZ_COLORS, getVizColor, VizPaletteKey, VizColorKey,
  DEFAULT, OTHER, LOADING, HOVER,
  CATEGORICAL_NORMAL,
  CYEA_DISCRETE, MAGE_DISCRETE, CYEA_CONTINUOUS, MAGE_CONTINUOUS,
  DIVERGING_4, DIVERGING_5, DIVERGING_6
} from './colors';

const STANDARD_COLOR_VALUE_NAMES: ColorValue[] = [ '50', '500', '600', '700' ];
const MINOR_COLOR_VALUE_NAMES: MinorColorValue[] = [ '1', '2', '3', '4', '5'];
const VIZ_COLOR_VALUE_NAMES: VizColorKey[] =[
  'orange', 'blue', 'yellow', 'purple', 'coral', 'teal', 'magenta', 'other'
];

describe('Brand Palettes Test', () => {
  it('exports a BRAND_COLORS library', () => {
    expect(BRAND_COLORS).toBeDefined();
    expect(Object.keys(BRAND_COLORS))
      .toEqual(['cyea', 'mage', 'bric', 'neutral']);

    for (const palette of Object.values(BRAND_COLORS)) {
      expect(palette.length).toBe(10);
    }
  });

  it('provides a function to get a Brand color', () => {
    expect(getBrandColor).toBeDefined();

    for (const key of Object.keys(BRAND_COLORS)) {
      const palette = key as LitBrandPaletteKey;

      // It returns a ColorEntry for ids in the range [0,9]
      for (const id of range(10)) {
        const color = getBrandColor(palette, id);
        expect(color).toBeDefined();
        expect(color.color).toBeDefined();
        expect(color.textColor).toBeDefined();
      }

      // It returns a ColorEntry when id > palette.length
      const over = getBrandColor(palette, BRAND_COLORS[palette].length);
      const first = getBrandColor(palette, 0);
      expect(over).toEqual(first);

      // It returns a ColorEntry when id < 0
      const under = getBrandColor(palette, -1);
      const last = getBrandColor(palette, BRAND_COLORS[palette].length - 1);
      expect(under).toEqual(last);

      // It returns a ColorEntry for standard color value names
      for (const id of STANDARD_COLOR_VALUE_NAMES) {
        const color = getBrandColor(palette, id);
        expect(color).toBeDefined();
        expect(color.color).toBeDefined();
        expect(color.textColor).toBeDefined();
      }
    }
  });
});

describe('Major Tonal Palettes Test', () => {
  it('exports a MAJOR_TONAL_COLORS library', () => {
    expect(MAJOR_TONAL_COLORS).toBeDefined();
    expect(Object.keys(MAJOR_TONAL_COLORS))
      .toEqual(['primary', 'secondary', 'tertiary', 'neutral-variant']);

    for (const palette of Object.values(MAJOR_TONAL_COLORS)) {
      expect(palette.length).toBe(10);
    }
  });

  it('provides a function to get a Major Tonal color', () => {
    expect(getMajorTonalColor).toBeDefined();

    for (const key of Object.keys(MAJOR_TONAL_COLORS)) {
      const palette = key as LitMajorTonalPaletteKey;

      // It returns a ColorEntry for ids in the range [0,9]
      for (const id of range(10)) {
        const color = getMajorTonalColor(palette, id);
        expect(color).toBeDefined();
        expect(color.color).toBeDefined();
        expect(color.textColor).toBeDefined();
      }

      // It returns a ColorEntry when id > palette.length
      const over = getMajorTonalColor(palette,
                                        MAJOR_TONAL_COLORS[palette].length);
      const first = getMajorTonalColor(palette, 0);
      expect(over).toEqual(first);

      // It returns a ColorEntry when id < 0
      const under = getMajorTonalColor(palette, -1);
      const last = getMajorTonalColor(palette,
                                      MAJOR_TONAL_COLORS[palette].length - 1);
      expect(under).toEqual(last);

      // It returns a ColorEntry for standard color value names
      for (const id of STANDARD_COLOR_VALUE_NAMES) {
        const color = getMajorTonalColor(palette, id);
        expect(color).toBeDefined();
        expect(color.color).toBeDefined();
        expect(color.textColor).toBeDefined();
      }
    }
  });
});

describe('Minor Tonal Palettes Test', () => {
  it('exports a MINOR_TONAL_COLORS library', () => {
    expect(MINOR_TONAL_COLORS).toBeDefined();
    expect(Object.keys(MINOR_TONAL_COLORS))
      .toEqual(['primary', 'secondary', 'tertiary']);

    for (const palette of Object.values(MINOR_TONAL_COLORS)) {
      expect(palette.length).toBe(5);
    }
  });

  it('provides a function to get a Minor Tonal color', () => {
    expect(getMinorTonalColor).toBeDefined();

    for (const key of Object.keys(MINOR_TONAL_COLORS)) {
      const palette = key as LitTonalPaletteKey;

      // It returns a ColorEntry for ids in the range [0,4]
      for (const id of range(5)) {
        const color = getMinorTonalColor(palette, id);
        expect(color).toBeDefined();
        expect(color.color).toBeDefined();
        expect(color.textColor).toBeDefined();
      }

      // It returns a ColorEntry when id > palette.length
      const over = getMinorTonalColor(palette,
                                        MINOR_TONAL_COLORS[palette].length);
      const first = getMinorTonalColor(palette, 0);
      expect(over).toEqual(first);

      // It returns a ColorEntry when id < 0
      const under = getMinorTonalColor(palette, -1);
      const last = getMinorTonalColor(palette,
                                      MINOR_TONAL_COLORS[palette].length - 1);
      expect(under).toEqual(last);

      // It returns a ColorEntry for minor color value names
      for (const id of MINOR_COLOR_VALUE_NAMES) {
        const color = getMinorTonalColor(palette, id);
        expect(color).toBeDefined();
        expect(color.color).toBeDefined();
        expect(color.textColor).toBeDefined();
      }
    }
  });
});

describe('Error Colors Test', () => {
  it('exports a ERROR_COLORS library', () => {
    expect(ERROR_COLORS).toBeDefined();
    expect(ERROR_COLORS.length).toBe(4);
  });

  it('provides a function to get a Major Tonal color', () => {
    expect(getErrorColor).toBeDefined();

    // It returns a ColorEntry for ids in the range [0,3]
    for (const id of range(4)) {
      const color = getErrorColor(id);
      expect(color).toBeDefined();
      expect(color.color).toBeDefined();
      expect(color.textColor).toBeDefined();
    }

    // It returns a ColorEntry when id > palette.length
    const over = getErrorColor(ERROR_COLORS.length);
    const first = getErrorColor(0);
    expect(over).toEqual(first);

    // It returns a ColorEntry when id < 0
    const under = getErrorColor(-1);
    const last = getErrorColor(ERROR_COLORS.length - 1);
    expect(under).toEqual(last);

    // It returns a ColorEntry for minor color value names
    for (const id of STANDARD_COLOR_VALUE_NAMES) {
      const color = getErrorColor(id);
      expect(color).toBeDefined();
      expect(color.color).toBeDefined();
      expect(color.textColor).toBeDefined();
    }
  });
});

describe('VizColors Palettes Test', () => {
  it('exports a VIZ_COLORS library', () => {
    expect(VIZ_COLORS).toBeDefined();
    expect(Object.keys(VIZ_COLORS))
      .toEqual(['pastel', 'bright', 'deep', 'dark']);

    for (const palette of Object.values(VIZ_COLORS)) {
      expect(palette.length).toBe(8);
    }
  });

  it('provides a function to get a VizColor color', () => {
    expect(getVizColor).toBeDefined();

    for (const key of Object.keys(VIZ_COLORS)) {
      const palette = key as VizPaletteKey;

      // It returns a ColorEntry for ids in the range [0,7]
      for (const id of range(8)) {
        const color = getVizColor(palette, id);
        expect(color).toBeDefined();
        expect(color.color).toBeDefined();
        expect(color.textColor).toBeDefined();
      }

      // It returns a ColorEntry for minor color value names
      for (const id of VIZ_COLOR_VALUE_NAMES) {
        const color = getVizColor(palette, id);
        expect(color).toBeDefined();
        expect(color.color).toBeDefined();
        expect(color.textColor).toBeDefined();
      }

      // It returns the "other" ColorEntry for any other id value
      const under = getVizColor(palette, -1);
      const other = VIZ_COLORS[palette][7];
      expect(under).toEqual(other);
    }
  });
});

describe('Pre-baked Colors, Palettes, and Ramps Test', () => {
  it('provides default, other, loading, and hover colors', () => {
    expect(DEFAULT).toEqual(getBrandColor('cyea', '400').color);
    expect(OTHER).toEqual(getVizColor('deep', 'other').color);
    expect(LOADING).toEqual(getBrandColor('neutral', '500').color);
    expect(HOVER).toEqual(getBrandColor('mage', '400').color);
  });

  it('provides a categorical color palette with 7 classes', () => {
    expect(CATEGORICAL_NORMAL).toBeDefined();
    expect(CATEGORICAL_NORMAL.length).toBe(7);
  });

  it('provides 2 sequential palettes with 3 classes', () => {
    expect(CYEA_DISCRETE).toBeDefined();
    expect(CYEA_DISCRETE.length).toBe(3);
    expect(MAGE_DISCRETE).toBeDefined();
    expect(MAGE_DISCRETE.length).toBe(3);
  });

  it('provides 3 diverging palettes', () => {
    expect(DIVERGING_4).toBeDefined();
    expect(DIVERGING_4.length).toBe(4);
    expect(DIVERGING_5).toBeDefined();
    expect(DIVERGING_5.length).toBe(5);
    expect(DIVERGING_6).toBeDefined();
    expect(DIVERGING_6.length).toBe(6);
  });

  it('provides 2 sequential color ramps', () => {
    expect(CYEA_CONTINUOUS).toBeDefined();
    expect(MAGE_CONTINUOUS).toBeDefined();
  });
});
