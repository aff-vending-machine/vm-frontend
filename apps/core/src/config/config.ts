let baseUrl = '';

export const getConfig = () => {
  return {
    baseUrl,
    apiUrl: `${baseUrl}/api/v2`,
  }
}

export const setURL = async (url: string) => {
  if (url == undefined || url == null) {
    return
  }

  baseUrl = url;
};
