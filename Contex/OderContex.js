import db from '../db.js'


export const postoder = (req, res) => {
    const { itemid, userid, quantity, total, status } = req.body;
    const query = 'INSERT INTO `order` (itemid, userid, quantity, total, status) VALUES (?, ?, ?, ?, ?)'; 


    
    db.query(query, [itemid, userid, quantity, total, status], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Order created successfully', orderId: result.insertId });
    });
}

  // API to get all orders
  export const getoder = (req, res) => {
    const { itemid, userid } = req.params;

    const query = `
        SELECT DISTINCT
            o.id, o.quantity, o.total, o.status,
            p.title, p.description, p.price, p.category,
            a.name as name, a.email as email,
            a.landmark as landmark,
            a.state as state,
            a.zip as zip
        FROM 
            \`order\` o
        JOIN 
            products p ON o.itemid = p.id
        JOIN 
            address a ON o.userid = a.id_user
        WHERE 
            o.itemid = ? AND o.userid = ?
    `;

    db.query(query, [itemid, userid], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
        

    });
};


  
