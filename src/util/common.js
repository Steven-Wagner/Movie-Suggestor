export function setStatePromise(component, newState) {
    return new Promise((resolve, reject) => {
        try {
            component.setState(
                newState, resolve
                // () => resolve(component.state)
            )
        }
        catch(err) {
            reject(err)
        }
    });
}