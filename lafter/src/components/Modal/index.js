import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import propTypes from 'prop-types';

import { CSSTransition } from 'react-transition-group';

function Modal(props) {
    const [ready, setReady] = useState(false);
    const [display, setDisplay] = useState(false);
    const [allow, setAllow] = useState(true);

    const ModalRef = useRef(null);

    const idModal = 'modal'

    const toggleAllow = () => {
        setAllow(!allow);
    }

    const toggle = () => {
        if (props.toggleModal) props.toggleModal()
        else setDisplay(!display);
    }

    const handleClickOutside = (e) => {
        if (ModalRef?.current && !ModalRef?.current?.contains?.(e.target) && allow) toggle()
    }

    useEffect(() => {
        const rootContainer = document.createElement('div');
        rootContainer.setAttribute('id', idModal);

        setReady(true);

        if (!document.getElementById(idModal)) {
            document.body.appendChild(rootContainer);
        }
    }, [])

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    })

    useEffect(() => {
        if (display || props.in) {
            document.querySelector('body').classList.add('modal-open');
        }

        return () => {
            document.querySelector('body').classList.remove('modal-open');
        }
    }, [display, props.in])

    if (!ready) return null;

    return (
        <>
            {props.children(toggle)}
            {document && document.getElementById(idModal) &&
                <div>
                    {
                        createPortal(
                            <CSSTransition in={props.in ?? display} timeout={500} onExit={toggleAllow} onExited={toggleAllow} classNames='overlay' unmountOnExit>
                                <div className="overlay fixed inset-0 h-screen z-50">
                                    <div className="bg-black/50 inset-0 absolute z-10">
                                        <div className="absolute z-20 flex items-center justify-center inset-0">
                                            <div style={props.modalStyle} ref={ModalRef} className="bg-white shadow-2xl max-w-3xl max-h-2xl">
                                                <div className="relative">
                                                    <span className='modal-close' onClick={toggle}></span>
                                                </div>

                                                {props.content(toggle)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CSSTransition>,
                            document.getElementById(idModal)
                        )
                    }
                </div>
            }
        </>
    );
}

Modal.defaultProps = {}
Modal.propTypes = {
    in: propTypes.bool,
    toggleModal: propTypes.func,
    content: propTypes.func.isRequired,
}

export default Modal;