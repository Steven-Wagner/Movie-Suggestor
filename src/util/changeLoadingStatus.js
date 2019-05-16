export default function changeLoadingStatusTo(component, status) {
    return new Promise((resolve, reject) => {
        try{
            component.setState({
                loading: {status: status}
            }, () => {
                resolve(true)
            })
        }
        catch(error){
            reject(error)
        }
    })
}