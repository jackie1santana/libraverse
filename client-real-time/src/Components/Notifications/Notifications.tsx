export const Notifications = ({ setStatus }): JSX.Element => {
    
    return (
        <div>
            <button onClick={() => setStatus(true)}>Notifications status</button>
        </div>
    )
}