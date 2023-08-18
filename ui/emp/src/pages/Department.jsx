import React, {Component} from 'react';
import {variables} from './Variables';

export class Department extends Component {

    constructor(props){

        super(props);

        this.state = {
            departments:[],
            modalTitle: "",
            departmentName: "",
            departmentId:"",

            departmentIdFilter: "",
            departmentNameFilter: "",
            departmentsWithoutFilter: [],
        }
    }

    filterFn(){
        var departmentIdFilter = this.state.departmentIdFilter;
        var departmentNameFilter = this.state.departmentNameFilter;
        var filteredData = this.state.departmentsWithoutFilter.filter(
            function(e1){
                return e1.DepartmentId.toString().toLowerCase().includes(
                    departmentIdFilter.toString().toLowerCase()
                )&&
                e1.DepartmentName.toString().toLowerCase().includes(
                    departmentNameFilter.toString().toLowerCase()
                )

            }
        )

        this.setState({departments: filteredData});
    }

    sortResults(prop, asc){
        var sortedData = this.state.departmentsWithoutFilter.sort(function(a,b){
            if(asc)
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
            
            else    
            return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);

        });

        this.setState({departments: sortedData});
    }

    refreshList(){
        fetch(variables.API_URL+'department')
        .then(response=>response.json())
        .then(data=>{
            this.setState({departments:data, departmentsWithoutFilter:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    changeDepartmentIdFilter = (e) =>{
        this.setState({departmentIdFilter:e.target.value});
        this.filterFn();
    }

    changeDepartmentNameFilter = (e) =>{
        this.setState({departmentNameFilter:e.target.value});
        this.filterFn();
    }

    changeDepartmentName = (e) =>{
        this.setState({departmentName:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle: "Add Department",
            departmentId:0,
            departmentName:""
        });
    }

    editClick(dep){
        this.setState({
            modalTitle: "Add Department",
            departmentId: dep.DepartmentId,
            departmentName: dep.DepartmentName
        });
    }

    createClick(){
        fetch(variables.API_URL+'department',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'content-type':'application/json'
            },
            body:JSON.stringify({
                DepartmentName:this.state.departmentName
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
        fetch(variables.API_URL+'department',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'content-type':'application/json'
            },
            body:JSON.stringify({
                DepartmentId:this.state.departmentId,
                DepartmentName:this.state.departmentName,
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

            fetch(variables.API_URL+'department/'+id,{
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

    render() {

        const {
            departments,
            modalTitle,
            departmentName,
            departmentId,
        } = this.state;

    return(
        <div>
            <button type="button" 
            className="btn btn-primary m-2 float-end"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal" 
            onClick={()=>this.addClick()}>
                Add Department
            </button>

            <table className="table table-striped">
            <thead>
                <tr>
                    <th>
                        <div className="d-flex flex-row">

                            <input className="form-control m-2" 
                            onChange={this.changeDepartmentIdFilter}
                            placeholder="Filter"/>

                            <button type="button" className="btn btn-primary m-2" 
                            onClick = {() => this.sortResults('DepartmentId', true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-numeric-down" viewBox="0 0 16 16">
                                <path d="M12.438 1.668V7H11.39V2.684h-.051l-1.211.859v-.969l1.262-.906h1.046z"/>
                                <path fill-rule="evenodd" d="M11.36 14.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.835 1.973-1.835 1.09 0 2.063.636 2.063 2.687 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98z"/>
                                <path d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"/>
                                </svg>
                            </button>

                            <button type="button" className="btn btn-primary m-2" 
                            onClick = {() => this.sortResults('DepartmentId', false)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-numeric-down-alt" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M11.36 7.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.836 1.973-1.836 1.09 0 2.063.637 2.063 2.688 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98z"/>
                                <path d="M12.438 8.668V14H11.39V9.684h-.051l-1.211.859v-.969l1.262-.906h1.046zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"/>
                                </svg>
                            </button>


                        </div>

                        DepartmentId
                    </th>
                    <th>
                        <div className="d-flex flex-row">

                        <input className="form-control m-2" 
                        onChange={this.changeDepartmentIdFilter}
                        placeholder="Filter"/>

                        <button type="button" className="btn btn-primary m-2" 
                        onClick = {() => this.sortResults('DepartmentName', true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-alpha-down" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z"/>
                            <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"/>
                            </svg>
                        </button>

                        <button type="button" className="btn btn-primary m-2" 
                        onClick = {() => this.sortResults('DepartmentName', false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-alpha-down-alt" viewBox="0 0 16 16">
                            <path d="M12.96 7H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V7z"/>
                            <path fill-rule="evenodd" d="M10.082 12.629 9.664 14H8.598l1.789-5.332h1.234L13.402 14h-1.12l-.419-1.371h-1.781zm1.57-.785L11 9.688h-.047l-.652 2.156h1.351z"/>
                            <path d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"/>
                            </svg>
                        </button>


                        </div>

                        DepartmentName
                    </th>
                </tr>
            </thead>
            <tbody>
                {departments.map(dep=>{
                    return(
                    <tr key={dep.DepartmentId}>
                        <td>
                            {dep.DepartmentId}
                        </td>
                        <td>
                            {dep.DepartmentName}
                        </td>
                        <td>
                            <button type="button" 
                             className="btn btn-primary m-2"
                             data-bs-toggle="modal"
                             data-bs-target="#exampleModal" 
                             onClick={()=>this.editClick(dep)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                                </svg>
                            </button>
                            <button type="button" 
                            className="btn btn-primary mr-2"
                            onClick={()=>this.deleteClick(dep.DepartmentId)}>
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
                <div className="input-group mb-3">
                    <span className="input-group-text">DepartmentName</span>
                    <input type="text" className="form-control" value={departmentName} onChange={this.changeDepartmentName}></input>
                </div> 
                {departmentId===0?
                <button type="button" 
                className="btn btn-primary float-start" 
                onClick={()=>this.createClick()}>Create</button>
                :null}

                {departmentId!==0?
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

