export const ThreadListItem = ({
    postTitle,
    userName,
}) => {
    return (<>
            
            <td> 
                <strong>
                {postTitle}<br />
                </strong>
                published by <strong>{userName}</strong>
            </td>

</>
    );
}