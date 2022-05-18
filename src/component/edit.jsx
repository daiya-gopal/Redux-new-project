import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import { userData  } from '../actions/index';

  function Edit(match) {
    
   const getuserdata    = useSelector((state) => state.setuserData); 
   const dispatch = useDispatch();
   const history = useHistory({forceRefresh:true});
   const { register, handleSubmit, formState: { errors },reset,setValue } = useForm();
   const {id} = useParams();

  
   const onSubmit = (values) => {

        if(getuserdata!=""){
 
              if(id!=''){

                    const updateitem = getuserdata.filter((ele, ind)=>{ 
                     
                        if(ind == id){ 
                            
                            ele.name     = values.name;
                            ele.email    = values.email;
                            ele.phone    = values.phone;
                            ele.address  = {'city' : values.city,'zipcode':values.zip}
                        }
 
                      return ele
                 });   

                let updated_array = updateitem;
                dispatch(userData(updated_array));
                history.push('/'); 
               }
           }
         }
    

    if(getuserdata!="" && id!=""){  
        
      const updateitem = getuserdata.filter((ele, ind)=>{
          return ind == id;
      });   

       setValue("name",updateitem[0]['name']);
       setValue("email",updateitem[0]['email']);
       setValue("phone",updateitem[0]['phone']);
       setValue("city",updateitem[0]['address']['city']);
       setValue("zip",updateitem[0]['address']['zipcode']);
       setValue("id",id);
      }  
  

  useEffect(() => {
   }, []);

    return (
    <>

   <div style={{margin:'30px auto',width:300,}}>
      <h1>Edit User</h1>
    <Form onSubmit={handleSubmit(onSubmit)} noValidate  method="post" action="" autoComplete="off">
     
      <input type={'hidden'} {...register("id")} value={''}/> 
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" 
         {...register("name", { required: true, required: 'required field.'})} />
         {errors.name && <p className="text-error">{errors.name.message}</p>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" 
          {...register("email", { required: true, required: 'required field.'})} />
          {errors.email && <p className="text-error">{errors.email.message}</p>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Phone</Form.Label>
        <Form.Control type="text" 
          {...register("phone", { required: true, required: 'required field.'})} />
          {errors.phone && <p className="text-error">{errors.phone.message}</p>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>City</Form.Label>
        <Form.Control {...register("city", { required: true, required: 'required field.'})} />
          {errors.city && <p className="text-error">{errors.city.message}</p>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Zip</Form.Label>
        <Form.Control {...register("zip", { required: true, required: 'required field.'})} />
          {errors.zip && <p className="text-error">{errors.zip.message}</p>}
      </Form.Group>

       <Button variant="primary" type="submit" style={{width:'100%'}}>
         Submit
      </Button>
    </Form>
    </div>  

     </>
    )
}

export default Edit
