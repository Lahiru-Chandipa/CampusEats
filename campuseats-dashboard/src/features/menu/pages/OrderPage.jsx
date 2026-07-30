import { useState } from "react";

function OrderPage() {
    const [form, setForm] = useState({ name: "", email: "", qty: 1 });

    const [errors, setErrors] = useState({});
    const [done, setDone] = useState(false);
 
 
    function validate(v) {
        const e = {};
        if (v.name.trim().length < 2) e.name = "Name too short";
        
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email))
          e.email = "Enter a valid email";
        
        if (Number(v.qty) < 1) e.qty = "Qty must be ≥ 1";
        return e;
    }

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const found = validate(form);
        setErrors(found);
        if (Object.keys(found).length === 0) setDone(true);
    }

    if (done) return <p>Thanks, {form.name}! Your order has been received.</p>;
        return (
          <div className="order-page">
            <form onSubmit={handleSubmit}>
                <div className="form-field">
                  <h3>Name</h3>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                  />
                  {errors.name && <span>{errors.name}</span>}
                </div>
                
                <div className="form-field">
                  <h3>Email</h3>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email address"
                  />
                  {errors.email && <span>{errors.email}</span>}
                </div>
                
                <div className="form-field">
                  <h3>Quantity</h3>
                  <input
                    name="qty"
                    type="number"
                    value={form.qty}
                    onChange={handleChange}
                    placeholder="Quantity"
                  />
                  {errors.qty && <span>{errors.qty}</span>}
                </div>
                
                <button type="submit">Place order</button>
            </form>
          </div>
        );
}

export default OrderPage;
