export default (resourcesPath: string) => {
    const first = resourcesPath[0].toLowerCase()
    return first + resourcesPath.slice(1)
}