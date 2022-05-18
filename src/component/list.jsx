import React from 'react';
import { useState,useEffect,useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { userData  } from '../actions/index';
import { Link } from "react-router-dom";

  function List(match) {
    
   const getuserdata    = useSelector((state) => state.setuserData); 
   const dispatch = useDispatch();
   const [getData, updateData] = useState([]);

   const fetchData = async () => {
     await axios.get("https://jsonplaceholder.typicode.com/users")
    .then(res => {

      updateData(res.data);
      dispatch(userData(res.data));

      }).catch(()=> { 
        console.log('Not valid')   
     })   
   };

        
  const del = useCallback( async (vl)=>{

    if (window.confirm("Are you sure delete this record")) {
        
        if(getuserdata!=""){

          const updateitem = getData.filter((ele, ind)=>{
              return ind != vl;
          });   

           dispatch(userData(updateitem));
           updateData(updateitem);
          }
    }
  },
  [getData]
)



  useEffect(() => {
    if(getuserdata!=""){ 
        updateData(getuserdata);
        }else{
        fetchData();
     }
   }, [getData]);

    return (
        <>
       
     <Link to="/add-user">
        <Button variant="primary" type="submit">
            Add User
        </Button>
      </Link>

        <Table striped bordered hover>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>City</th>
                <th>-</th>
              </tr>
            </thead>
            <tbody>

       { getData!="" ?  
           getData?.map((dt,key) => {    
              return(<tr key={key}>
                <td>{key+1}</td>
                <td>{dt.name}</td>
                <td>{dt.email}</td>
                <td>{dt.phone}</td>
                <td>{dt.address.city} <br/>
                    Zip : {dt.address.zipcode}
                </td>
                <td><div> <Link to={"/edit-user/"+key}>Edit </Link> </div>
                 <br/> <div onClick={()=> del(key) }> Delete </div></td>
              </tr>)
              }) 
            : <span>please wait...</span> }
            </tbody>
          </Table> 
     </>
    )
}

export default List
