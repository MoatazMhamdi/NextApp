export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { firstName, lastName, email, phone_nbr, adress, dateNaissance } = req.body;
  
      // Enregistrer les informations utilisateur dans ta base de données
      try {
        const response = await fetch('http://localhost:5000/api/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            phone_nbr,
            adress,
            dateNaissance,
          }),
        });
        if (!response.ok) {
          throw new Error('Erreur lors de l\'enregistrement');
        }
        res.status(200).json({ message: 'Utilisateur enregistré avec succès' });
      } catch (error) {
        res.status(500).json({ error: 'Erreur lors de l\'enregistrement' });
      }
    } else {
      res.status(405).json({ message: 'Méthode non autorisée' });
    }
  }
  