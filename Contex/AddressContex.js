import db from '../db.js';

export const addAddress = (req, res) => {
  const { name, email, phone, Aphone, landmark, house_no, state, zip, id_user } = req.body;
  console.log(req.body);
  const insertQuery = 'INSERT INTO address (name, email, phone, Aphone, landmark, house_no, state, zip, id_user) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [name, email, phone, Aphone, landmark, house_no, state, zip, id_user];

  db.query(insertQuery, values, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(200).json({ message: 'Address created successfully', address: req.body });
    }
  });
};

export const getAddress = (req, res) => {
  const { id_user } = req.params;
  console.log(id_user);
  const selectQuery = 'SELECT * FROM address WHERE id_user = ?';

  db.query(selectQuery, [id_user], (err, results) => {
    if (err) {
      console.error('Error retrieving addresses:', err); // Log the error for debugging
      return res.status(500).json({ error: err.message });
    } else {
      console.log('Addresses retrieved successfully:', results); // Log the results for debugging
      return res.status(200).json({ addresses: results });
    }
  });
};

export const updateAddress = (req, res) => {
  const { addressid } = req.params; // Make sure this matches the route parameter
  console.log(addressid)
  const { name, email, phone, Aphone, landmark, house_no, state, zip, id_user } = req.body;
console.log( {requtest :req.body})
  const updateQuery = 'UPDATE address SET name=?, email=?, phone=?, Aphone=?, landmark=?, house_no=?, state=?, zip=?, id_user=? WHERE id=?';
  const values = [name, email, phone, Aphone, landmark, house_no, state, zip, id_user, addressid];

  db.query(updateQuery, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(200).json({ message: 'Address updated successfully' });
    }
  });
};

