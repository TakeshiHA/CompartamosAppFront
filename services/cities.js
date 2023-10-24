import fetcher from "./fetcher"

export const getCities = async () => {
  return await fetcher(`/cities`)
}