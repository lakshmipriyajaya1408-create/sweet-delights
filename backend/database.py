import os
from urllib.parse import urlparse, parse_qsl, urlencode, urlunparse

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = os.getenv("DATABASE_URL")

# Convert Aiven's mysql:// URL to SQLAlchemy's PyMySQL URL
if DATABASE_URL.startswith("mysql://"):
    DATABASE_URL = DATABASE_URL.replace(
        "mysql://",
        "mysql+pymysql://",
        1
    )

# Remove Aiven's ssl-mode query parameter because PyMySQL
# doesn't accept it as a direct connection argument.
parsed_url = urlparse(DATABASE_URL)

query_params = parse_qsl(parsed_url.query, keep_blank_values=True)
query_params = [
    (key, value)
    for key, value in query_params
    if key.lower() != "ssl-mode"
]

DATABASE_URL = urlunparse(
    parsed_url._replace(query=urlencode(query_params))
)

engine = create_engine(
    DATABASE_URL,
    connect_args={"ssl": {}}
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()