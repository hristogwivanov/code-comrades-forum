import React, { useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import styles from './Settings.module.css';
import Modal from './Modal/Modal';


export const Settings = () => {

    const { userEmail } = useAuthContext();
    const [show, setShow] = useState(false);


    return (<>
        <section id={styles['settings-page']} className="">
            <table className={styles['Table']}>
                <thead>

                    <tr><td><strong>Settings</strong></td></tr>
                </thead>
                <tbody>
                    <tr><td>
                        <div className={styles['userinfo']}>
                            <strong>
                                {userEmail}
                            </strong>
                            <br />
                            <img src='https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png' alt='userpic'></img>
                            <br />

                        </div>
                        <button>Change Avatar</button><br />
                        <p>Lorem Ipsum dolor asopdkjdsa</p>
                        <button onClick={() => setShow(true)}>Change About Info</button>
                        <Modal title="My Modal" onClose={() => setShow(false)} show={show}>
                            <p>This is modal body</p>
                        </Modal>
                    </td>

                    </tr>

                </tbody>
            </table>
        </section>

    </>
    );
}