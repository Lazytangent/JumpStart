from flask_wtf import FlaskForm
from wtforms import StringField, FileField, IntegerField
from wtforms.validators import DataRequired


class CreateProject(FlaskForm):
    name = StringField("name", validators=[DataRequired()])
    description = StringField("description", validators=[DataRequired()])
    goalAmount = IntegerField("goalAmount", validators=[DataRequired()])
    minPledge = IntegerField("minPledge", validators=[DataRequired()])
    thumbnailImg = FileField("thumbnailImg")
    userId = IntegerField("userId")
