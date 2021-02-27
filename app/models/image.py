from .db import db


class Image(db.Model):
    __tablename__ = 'images'

    id = db.Column(db.Integer, primary_key=True)
    projectId = db.Column(db.Integer, db.ForeignKey("projects.id"))
    imageUrl = db.Column(db.String(255), nullable=False)

    project = db.relationship("Project", back_populates="images")

    def to_dict(self):
        return {
            "projectId": self.projectId,
            "imageUrl": self.imageUrl,
            "project": self.project.name,
            "id": self.id
        }
