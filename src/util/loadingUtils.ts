// src/utils/loadingUtils.ts
let globalShowLoading: () => void = () => {};
let globalHideLoading: () => void = () => {};

export const setLoadingFunctions = (show: () => void, hide: () => void) => {
  globalShowLoading = show;
  globalHideLoading = hide;
};

export const getLoadingFunctions = () => ({
  showLoading: globalShowLoading,
  hideLoading: globalHideLoading,
});
