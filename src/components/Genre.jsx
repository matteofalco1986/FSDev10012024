import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from "react-bootstrap";

const Genre = (props) => {
    return (
        <div className="d-flex justify-content-between">
            <div className="d-flex">
                <h2 className="mb-4">TV Shows</h2>
                <div className="ml-4 mt-1">
                    <Dropdown>
                        <Dropdown.Toggle
                            style={{ backgroundColor: "#221f1f" }}
                            id="dropdownMenuButton"
                            className="btn-secondary btn-sm dropdown-toggle rounded-0"
                        >
                            Genres
                        </Dropdown.Toggle>
                        <Dropdown.Menu bg="dark">
                            <Dropdown.Item href="#/action-1">
                                Comedy
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-2">
                                Drama
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-3">
                                Thriller
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            <div>
                <i className="fa fa-th-large icons"></i>
                <i className="fa fa-th icons"></i>
            </div>
        </div>

    )
}

export default Genre;