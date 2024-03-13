```
terraform init
terraform plan
```

add your MONGO_URI to secrets.tfvars

```

terraform apply -var-file="secrets.tfvars"

```

```
terraform destroy -var-file="secrets.tfvars"
```
