import { cpf, cnpj } from 'cpf-cnpj-validator';


export const capitalize = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export const formatServerError = (message: string | undefined, defaultMessage: string) => {
  if (!message) {
    return defaultMessage
  }

  const errors = message.split(':')
  const errorMessage = errors[0]
  return capitalize(errorMessage)
}

export const stipDocumentByType = (type: string, value: string): string => {
  switch (type) {
    case "CPF":
      return cpf.strip(value, true)
    case "CNPJ":
      return cnpj.strip(value, true)
    default:
      return ""
  }
}