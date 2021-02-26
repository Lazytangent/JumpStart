from .db import db


class Project(db.Model):
    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"))
    name = db.Column(db.String(100), nullable=False)
    thumbnailImgUrl = db.Column(db.String(255), nullable=True)
    description = db.Column(db.Text, nullable=False)
    goalAmount = db.Column(db.Integer, nullable=False)
    minPledge = db.Column(db.Integer, nullable=False)
    isClosed = db.Column(db.Boolean, nullable=False, default=False)

    user = db.relationship("User", back_populates="projects")
    donations = db.relationship("Donation",
                                cascade="all,delete",
                                back_populates="project")
    images = db.relationship("Image",
                             cascade="all,delete",
                             back_populates="project")

    def to_dict(self):
        return {
            "name": self.name,
            "userId": self.userId,
            "id": self.id,
            "thumbnailImgUrl": self.thumbnailImgUrl,
            "description": self.description,
            "goalAmount": self.goalAmount,
            "minPledge": self.minPledge,
            "donations": [donation.to_dict() for donation in self.donations],
            "user": self.user.to_dict(),
            "images": [image.to_dict() for image in self.images]
        }
