export function faileToCreateMessage(useCase: string): string {
  return `${useCase} creation failed due to an error. Please check your input and try again.`;
}

export function dataNotFoundMessage(useCase: string): string {
  return `${useCase} not found. Please check the information and try again.`;
}
