# Generated by Django 4.2.18 on 2025-01-22 18:18

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=255, unique=True)),
                ('password', models.CharField(max_length=255)),
                ('name', models.CharField(max_length=255)),
                ('isactive', models.IntegerField()),
                ('createdat', models.DateTimeField(auto_now_add=True)),
                ('updatedat', models.DateTimeField(auto_now=True)),
                ('phone_number', models.CharField(max_length=20)),
                ('address', models.CharField(max_length=255)),
                ('profile_img', models.CharField(max_length=255)),
            ],
            options={
                'db_table': 'users',
                'ordering': ['-createdat'],
            },
        ),
    ]
