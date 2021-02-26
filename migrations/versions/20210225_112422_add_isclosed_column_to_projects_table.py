"""add isClosed column to projects table

Revision ID: 675d86ad6334
Revises: 706a8e104643
Create Date: 2021-02-25 11:24:22.148230

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '675d86ad6334'
down_revision = '706a8e104643'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('projects', sa.Column('isClosed', sa.Boolean(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('projects', 'isClosed')
    # ### end Alembic commands ###
