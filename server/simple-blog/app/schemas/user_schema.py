from marshmallow import Schema, fields
from marshmallow.validate import Length


class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    username = fields.Str(required=True, validate=Length(min=3, max=30))
    first_name = fields.Str(required=True, validate=Length(min=1, max=50))
    last_name = fields.Str(required=True, validate=Length(min=1, max=50))
    password = fields.Str(
        required=True, load_only=True, validate=Length(min=6, max=100)
    )
    password_hash = fields.Str(dump_only=True)
