from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired


class CreateDonation(FlaskForm):
    userId = IntegerField("userId")
    projectId = IntegerField("projectId")
    donationAmount = IntegerField("donationAmount",
                                  validators=[DataRequired()])
    comment = StringField("comment")
    anonymous = BooleanField("anonymous")
