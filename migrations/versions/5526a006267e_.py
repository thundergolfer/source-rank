"""empty message

Revision ID: 5526a006267e
Revises: 662ee7125d62
Create Date: 2018-05-04 22:47:13.947927

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5526a006267e'
down_revision = '662ee7125d62'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('publication', sa.Column('pro_science', sa.Boolean(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('publication', 'pro_science')
    # ### end Alembic commands ###
