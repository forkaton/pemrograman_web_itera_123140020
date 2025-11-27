from pyramid.view import view_config
from pyramid.response import Response
from sqlalchemy.exc import DBAPIError
from ..models import Matakuliah

# 1. GET ALL
@view_config(route_name='get_all_matakuliah', renderer='json')
def get_all_matakuliah(request):
    try:
        mks = request.dbsession.query(Matakuliah).all()
        return {'matakuliahs': [mk.to_dict() for mk in mks]}
    except DBAPIError:
        return Response(json_body={'error': 'Database error'}, status=500)

# 2. GET ONE
@view_config(route_name='get_one_matakuliah', renderer='json')
def get_one_matakuliah(request):
    mk_id = request.matchdict['id']
    mk = request.dbsession.query(Matakuliah).filter_by(id=mk_id).first()
    if mk:
        return mk.to_dict()
    return Response(json_body={'error': 'Not found'}, status=404)

# 3. POST (Add)
@view_config(route_name='add_matakuliah', renderer='json')
def add_matakuliah(request):
    try:
        data = request.json_body
        new_mk = Matakuliah(
            kode_mk=data['kode_mk'],
            nama_mk=data['nama_mk'],
            sks=data['sks'],
            semester=data['semester']
        )
        request.dbsession.add(new_mk)
        request.dbsession.flush()
        return {'message': 'Success', 'data': new_mk.to_dict()}
    except Exception as e:
        return Response(json_body={'error': str(e)}, status=500)

# 4. PUT (Update)
@view_config(route_name='update_matakuliah', renderer='json')
def update_matakuliah(request):
    mk_id = request.matchdict['id']
    mk = request.dbsession.query(Matakuliah).filter_by(id=mk_id).first()
    if not mk:
        return Response(json_body={'error': 'Not found'}, status=404)
    
    data = request.json_body
    if 'kode_mk' in data: mk.kode_mk = data['kode_mk']
    if 'nama_mk' in data: mk.nama_mk = data['nama_mk']
    if 'sks' in data: mk.sks = data['sks']
    if 'semester' in data: mk.semester = data['semester']
    
    return {'message': 'Updated', 'data': mk.to_dict()}

# 5. DELETE
@view_config(route_name='delete_matakuliah', renderer='json')
def delete_matakuliah(request):
    mk_id = request.matchdict['id']
    mk = request.dbsession.query(Matakuliah).filter_by(id=mk_id).first()
    if not mk:
        return Response(json_body={'error': 'Not found'}, status=404)
    request.dbsession.delete(mk)
    return {'message': 'Deleted'}