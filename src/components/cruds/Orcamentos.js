import Navadm from '../Navadm';
import "../../App.css";
import Aos from 'aos';
import { useState, useEffect } from 'react';

export default function AdminOrcamentos() {

    return (
        <>
            <Navadm />
            <div className='mt-4'>
                <h1 style={{color: "#FFD230"}}>Lista de Orçamentos</h1>
            </div>
        </>
    )
}