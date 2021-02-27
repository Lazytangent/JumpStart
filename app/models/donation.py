from .db import db


class Donation(db.Model):
    __tablename__ = 'donations'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"))
    projectId = db.Column(db.Integer, db.ForeignKey("projects.id"))
    donationAmount = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text, nullable=True)
    anonymous = db.Column(db.Boolean, nullable=False)

    user = db.relationship("User", back_populates="donations")
    project = db.relationship("Project", back_populates="donations")

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "projectId": self.projectId,
            "donationAmount": self.donationAmount,
            "comment": self.comment,
            "anonymous": self.anonymous,
            "donator": self.user.to_dict()
        }
