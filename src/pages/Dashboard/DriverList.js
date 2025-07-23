import React from 'react'
// import Sidebar from '../Dashboard/Sidebar';

const driverlist = () => {
  return (
    <div >
      <main className='main-container col-md-8 mx-md-auto'>
      <div className="container my-5" style={{ backgroundColor: 'white' }}>
        <div className="card-body text-center mt-5">
          <h4 className="card-title text-dark">List of active drivers</h4>
          <p className="card-text text-dark">With supporting text below as a natural lead-in to additional content.</p>
        </div>
        <div className="card mt-5 bg-white">
          
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">List Name</th>
                <th scope="col">Deadline</th>
                <th scope="col">Edit List</th>
                <th scope="col">List Info</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>

                </td>
                <td><a className="btn btn-sm btn-info" href="#"><i className="fas fa-info-circle"></i> Details</a></td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>
       
                </td>
                <td><a className="btn btn-sm btn-info" href="#"><i className="fas fa-info-circle"></i> Details</a></td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td colSpan="2">Larry the Bird</td>
                <td>
                  
                </td>
                <td><a className="btn btn-sm btn-info" href="#"><i className="fas fa-info-circle"></i> Details</a></td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Large modal */}
        <div className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="card-body text-center">
                <h4 className="card-title">List of active drivers</h4>
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              </div>
              <div className="card col-8 offset-2 my-2 p-3">
                <form>
                  <div className="form-group">
                    <label htmlFor="listname">List name</label>
                    <input type="text" className="form-control" name="listname" id="listname" placeholder="Enter your listname" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="datepicker">Deadline</label>
                    <input type="text" className="form-control" name="datepicker" id="datepicker" placeholder="Pick up a date" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="datepicker">Add a list item</label>
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder="Add an item" aria-label="Search for..." />
                      <span className="input-group-btn">
                        <button className="btn btn-secondary" type="button">Go!</button>
                      </span>
                    </div>
                  </div>
                  <div className="form-group text-center">
                    <button type="submit" className="btn btn-block btn-primary">Sign in</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    </div>
  )
}

export default driverlist
