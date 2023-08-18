from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from EmployeeApp.models import Department, Employee
from EmployeeApp.serializers import DepartmentSerializer, EmployeeSerializer

from django.core.files.storage import default_storage

@csrf_exempt
def departmentApi(request,id = 0):
    if request.method == 'GET':
        # Select the department
        departments = Department.objects.all()
        departments_serializer = DepartmentSerializer(departments, many=True)
        return JsonResponse(departments_serializer.data, safe=False)
    elif request.method == 'POST':
        # Insert a new department
        department_data = JSONParser().parse(request)
        departments_serializer = DepartmentSerializer(data=department_data)
        
        if departments_serializer.is_valid():
            departments_serializer.save()
            return JsonResponse("Added Successfully", safe=False)
    
        return JsonResponse("Failed to Add", safe=False)

    elif request.method == 'PUT':
        # Update a department
        department_data = JSONParser().parse(request)
        department = Department.objects.get(DepartmentId=department_data['DepartmentId'])
        departments_serializer = DepartmentSerializer(department, data=department_data)
        if departments_serializer.is_valid():
            departments_serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update", safe=False)

    elif request.method == 'DELETE':
        department_data = Department.objects.get(DepartmentId=id)
        department_data.delete()
        
        return JsonResponse("Deleted Successfully",safe=False)
    

@csrf_exempt
def employeeApi(request,id = 0):
    if request.method == 'GET':
        # Select the Employee
        employees = Employee.objects.all()
        employees_serializer = EmployeeSerializer(employees, many=True)
        return JsonResponse(employees_serializer.data, safe=False)
    elif request.method == 'POST':
        # Insert a new Employee
        employees_data = JSONParser().parse(request)
        employees_serializer = EmployeeSerializer(data=employees_data)
        
        if employees_serializer.is_valid():
            employees_serializer.save()
            return JsonResponse("Added Successfully", safe=False)
    
        return JsonResponse("Failed to Add", safe=False)

    elif request.method == 'PUT':
        # Update an Employee Details
        employees_data = JSONParser().parse(request)
        employee = Employee.objects.get(EmployeeId=employees_data['EmployeeId'])
        employees_serializer = EmployeeSerializer(employee, data=employees_data)
        if employees_serializer.is_valid():
            employees_serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update", safe=False)

    elif request.method == 'DELETE':
        employees_data = Employee.objects.get(EmployeeId=id)
        employees_data.delete()
        
        return JsonResponse("Deleted Successfully",safe=False)
    
@csrf_exempt
def SaveFile(request):
    file = request.FILES['file']
    file_name = default_storage.save(file.name, file)
    return JsonResponse(file_name, safe=False)