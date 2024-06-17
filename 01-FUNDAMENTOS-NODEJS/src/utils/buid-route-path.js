export function buildRoutePath(path) {
    const routerParametersRegex = /:([a-zA-Z]+)/g
    const paramsWithParams  = path.replaceAll(routerParametersRegex, '(?<$1>[a-z0-9\-_]+)')

    const pathRegex = new RegExp(`^${paramsWithParams }(?<query>\\?(.*))?$`)

    return pathRegex;
}