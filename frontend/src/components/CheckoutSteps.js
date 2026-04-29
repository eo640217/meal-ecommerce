import React from 'react';
import { Link } from 'react-router-dom';

const steps = [
    { label: 'Sign In', path: '/signin' },
    { label: 'Shipping', path: '/shipping' },
    { label: 'Payment', path: '/payment' },
    { label: 'Review', path: '/placeorder' },
];

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    const active = [step1, step2, step3, step4];
    return (
        <ol className='checkout-track'>
            {steps.map((step, i) => (
                <React.Fragment key={step.label}>
                    {i > 0 && <li className={`ck-connector${active[i] ? ' active' : ''}`} />}
                    <li className={`ck-step${active[i] ? ' active' : ''}`}>
                        <span className='ck-step-num'>{i + 1}</span>
                        {active[i]
                            ? <Link to={step.path} style={{ color: 'inherit', textDecoration: 'none' }}>{step.label}</Link>
                            : <span>{step.label}</span>
                        }
                    </li>
                </React.Fragment>
            ))}
        </ol>
    );
}

export default CheckoutSteps;
