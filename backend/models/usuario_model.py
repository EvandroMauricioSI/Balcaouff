from ..extensions import db

class Usuario(db.Model):
    __tablename__ = 'usuarios'

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, nullable=True)

    def __str__(self):
        return f"id {self.id}, key_id ({self.key_id}), registered on {self.created_at}, raw: {self.raw}"
