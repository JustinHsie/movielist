from sqlalchemy import Integer, String, Column, Boolean
from sqlalchemy.orm import relationship

from app.db.base_class import Base

# One to many, one user many movies
class User(Base):
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(256), nullable=True)
    last_name = Column(String(256), nullable=True)
    email = Column(String, index=True, nullable=False)
    is_superuser = Column(Boolean, default=False)
    movies = relationship(
        "Movie",
        cascade="all,delete-orphan",
        back_populates="submitter",
        uselist=True,
    )

    hashed_password = Column(String, nullable=False)
