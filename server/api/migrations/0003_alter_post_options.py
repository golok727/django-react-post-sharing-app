# Generated by Django 4.1.7 on 2023-04-01 06:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_post_likes_fld'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='post',
            options={'ordering': ['-created']},
        ),
    ]
