/**
 * state with recipe styles of particular recipe type
 * @param data - data with styles - primary color, secondary color and icon (<svg> tag)
 */
export const changeRecipeStylesRDX = data => ({
    type: "SET_RECIPE_STYLES",
    data
});
