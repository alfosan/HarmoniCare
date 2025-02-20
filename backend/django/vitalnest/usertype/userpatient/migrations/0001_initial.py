# Generated by Django 4.2.18 on 2025-01-22 18:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserPatient',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=255, unique=True)),
                ('name_patient', models.CharField(max_length=255)),
                ('allergies', models.JSONField()),
                ('difficulties', models.JSONField()),
                ('discapacity', models.IntegerField()),
                ('isactive', models.IntegerField()),
                ('createdat', models.DateTimeField(auto_now_add=True)),
                ('updatedat', models.DateTimeField(auto_now=True)),
                ('phone_number', models.CharField(max_length=20)),
                ('birthday', models.CharField(max_length=255)),
                ('id_user', models.ForeignKey(blank=True, db_column='id_user', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='patients', to='user.user')),
            ],
            options={
                'db_table': 'userpatient',
                'ordering': ['-createdat'],
            },
        ),
    ]
