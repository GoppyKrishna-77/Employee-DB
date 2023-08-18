import React, {Component} from 'react';
import {variables} from './Variables';

export class Employee extends Component {

    constructor(props){

        super(props);

        this.state = {
            departments:[],
            employees:[],
            modalTitle: "",
            departmentName: "",
            departmentId:"",
            employeeName: "",
            department:"",
            dateOfJoining: "",
            photoFileName: "a.jpg",
            photoPath: variables.PHOTO_URL
        }
    }

    refreshList(){

        fetch(variables.API_URL+'employee')
        .then(response=>response.json())
        .then(data=>{
            this.setState({employees:data});
        });

        fetch(variables.API_URL+'department')
        .then(response=>response.json())
        .then(data=>{
            this.setState({departments:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    changeEmployeeName = (e) =>{
        this.setState({employeeName:e.target.value});
    }

    changeDepartment = (e) =>{
        this.setState({department:e.target.value});
    }

    changeDateOfJoining = (e) =>{
        this.setState({dateOfJoining:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle: "Add Employee",
            employeeId: 0,
            employeeName:"",
            department:"",
            dateOfJoining:"",
            photoFileName:"a.jpg"
        });
    }

    editClick(emp){
        this.setState({
            modalTitle: "Add Employee",
            employeeId: emp.EmployeeId,
            employeeName:emp.EmployeeName,
            department:emp.Department,
            dateOfJoining:emp.DateOfJoining,
            photoFileName:emp.PhotoFileName
        });
    }

    createClick(){
        fetch(variables.API_URL+'employee',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'content-type':'application/json'
            },
            body:JSON.stringify({
                EmployeeName:this.state.employeeName,
                Department:this.state.department,
                DateOfJoining:this.state.dateOfJoining,
                PhotoFileName:this.state.photoFileName
            })
        }).then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert("Failed");
        });
    }

    updateClick(){
        fetch(variables.API_URL+'employee',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'content-type':'application/json'
            },
            body:JSON.stringify({
                EmployeeId:this.state.employeeId,
                EmployeeName:this.state.employeeName,
                Department:this.state.department,
                DateOfJoining:this.state.dateOfJoining,
                PhotoFileName:this.state.photoFileName
            })
        }).then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert("Failed");
        });
    }

    deleteClick(id){
        if(window.confirm('Are you sure you want to delete?')){
            fetch(variables.API_URL+'employee/'+id,{
                method:'DELETE',
                headers:{
                    'Accept':'application/json',
                    'content-type':'application/json'
                }
            }).then(res=>res.json())
            .then((result)=>{
                alert(result);
                this.refreshList();
            },(error)=>{
                alert("Failed");
            });
        }
    }

    imageUpload = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file",e.target.files[0],e.target.files[0].name);

        fetch(variables.API_URL+"/employee/savefile", {
            method:"POST",
            body:formData
        }).then(res=>res.json()).then(data=>{
            this.setState(
                {photoFileName:data}
            );
        });
    }

    render() {
        const {
            departments,
            employees,
            modalTitle,
            department,
            employeeId,
            employeeName,
            dateOfJoining,
            photoFileName,
            photoPath
        } = this.state;
    return(
        <div>
            <button type="button" 
            className="btn btn-primary m-2 float-end"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal" 
            onClick={()=>this.addClick()}>
                Add Employee
            </button>

            <table className="table table-striped">
            <thead>
                <tr>
                    <th>
                        EmployeeId
                    </th>
                    <th>
                        EmployeeName
                    </th>
                    <th>
                        Department
                    </th>
                    <th>
                        DateOfJoining
                    </th>
                </tr>
            </thead>
            <tbody>
                {employees.map(emp=>{
                    return(
                    <tr key={emp.EmployeeId}>
                        <td>
                            {emp.EmployeeId}
                        </td>
                        <td>
                            {emp.EmployeeName}
                        </td>
                        <td>
                            {emp.Department}
                        </td>
                        <td>
                            {emp.DateOfJoining}
                        </td>
                        <td>
                            <button type="button" 
                             className="btn btn-primary m-2"
                             data-bs-toggle="modal"
                             data-bs-target="#exampleModal" 
                             onClick={()=>this.editClick(emp)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                                </svg>
                            </button>
                            <button type="button" 
                            className="btn btn-primary mr-2"
                            onClick={()=>this.deleteClick(emp.EmployeeId)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                            </svg>
                            </button>
                        </td>
                    </tr>
                    )
                })}
            </tbody>
            </table>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
                <div className="d-flex flex-row bd-highlight mb-3">
                    <div className="p-2 w-50 bd-highlight">

                    <div className="input-group mb-3">
                        <span className="input-group-text">EmployeeName</span>
                        <input type="text" className="form-control" value={employeeName} onChange={this.changeEmployeeName}></input>
                    </div> 

                    <div className="input-group mb-3">
                        <span className="input-group-text">Department</span>
                        <select className="form-select"
                        onChange={this.changeDepartment}
                        value={department}>
                            {employeeId===0?

                            <option default>{"  "}</option>
                            :null}
                            {
                                departments.map(dep=>{
                                    return(<option key={dep.DepartmentId}>{dep.DepartmentName}</option>)
                                })
                            }
                        </select>
                    </div> 

                    <div className="input-group mb-3">
                        <span className="input-group-text">DateOfJoin</span>
                        <input type="date" className="form-control" value={dateOfJoining} onChange={this.changeDateOfJoining}></input>
                    </div> 

                    </div>

                    <div className="p-2 w-50 bd-highlight">
                        <img src={photoPath+photoFileName} alt="profile pic" width="250px" height="250px"/>
                        <input type="file" className="m-2" onChange={this.imageUpload}/>
                    </div>
            </div>

                {employeeId===0?
                <button type="button" 
                className="btn btn-primary float-start" 
                onClick={()=>this.createClick()}>Create</button>
                :null}

                {employeeId!==0?
                <button type="button" className="btn btn-primary float-start" onClick={()=>this.updateClick()}>Update</button>
                :null}
            
        </div>
        </div>
        </div>
        </div>
        </div>
    )
    }
}

