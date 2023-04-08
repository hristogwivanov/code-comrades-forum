export const ThreadListItem = ({
    postTitle,
    userEmail,
}) => {
    return (<>
            
            <td> 
                <strong>
                {postTitle}<br />
                </strong>
                published by {userEmail}
            </td>

</>
    );
}