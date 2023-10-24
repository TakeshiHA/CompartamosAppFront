import fetcher from "./fetcher"

export const getClients = async () => {
  return await fetcher(`/clients`)
}

export const getClient = async (id) => {
  return await fetcher(`/clients/${id}`)
}

export const saveClient = async (body) => {
  return await fetcher(`/clients`, "POST", body)
}

export const updateClient = async (id, body) => {
  return await fetcher(`/clients/${id}`, "PUT", body)
}

export const deleteClient = async (id) => {
  return await fetcher(`/clients/${id}`, "DELETE")
}