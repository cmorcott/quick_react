import './ShoppingCart.css';


const ShoppingCart = ({ children, open, close }) => {
    return (
        <div
            className={`modal ${open ? 'modal-show' : ''}`}
            tabIndex="-1"
            role="dialog"
            onClick={(evt) => { if (evt.target === evt.currentTarget) close(); }}
        >
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h1>My Schedule</h1>
                    <button type="button" className="btn-close" aria-label="Close" onClick={close}>
                    </button>
                </div>
                <div className="modal-body">
                {children}
                </div>
            </div>
            </div>
        </div>
        );
};

export default ShoppingCart;